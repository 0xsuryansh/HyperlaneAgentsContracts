use eyre::Result;
use prometheus::{
    histogram_opts, labels, opts, register_counter_vec_with_registry,
    register_gauge_vec_with_registry, register_histogram_vec_with_registry,
    register_int_counter_vec_with_registry, register_int_gauge_vec_with_registry, CounterVec,
    Encoder, GaugeVec, HistogramVec, IntCounterVec, IntGaugeVec, Registry,
};
use std::collections::HashMap;
use std::fmt::{Debug, Formatter};
use std::sync::{Arc, OnceLock};
use tokio::task::JoinHandle;
use tracing::warn;

use ethers_prometheus::{json_rpc_client::JsonRpcClientMetrics, middleware::MiddlewareMetrics};

use crate::metrics::{
    json_rpc_client::create_json_rpc_client_metrics, provider::create_provider_metrics,
};

/// Macro to prefix a string with the namespace.
macro_rules! namespaced {
    ($name:expr) => {
        format!("{}_{}", super::NAMESPACE, $name)
    };
}

/// Metrics for a particular domain
pub struct CoreMetrics {
    /// Metrics registry for adding new metrics and gathering reports
    registry: Registry,
    const_labels: HashMap<String, String>,
    listen_port: u16,
    agent_name: String,

    span_durations: CounterVec,
    span_counts: IntCounterVec,
    span_events: IntCounterVec,
    last_known_message_nonce: IntGaugeVec,
    validator_checkpoint_index: IntGaugeVec,
    submitter_queue_length: IntGaugeVec,

    operations_processed_count: IntCounterVec,
    messages_processed_count: IntCounterVec,

    latest_checkpoint: IntGaugeVec,

    /// Set of metrics that tightly wrap the JsonRpcClient for use with the
    /// quorum provider.
    json_rpc_client_metrics: OnceLock<JsonRpcClientMetrics>,

    /// Set of provider-specific metrics. These only need to get created once.
    provider_metrics: OnceLock<MiddlewareMetrics>,
}

impl CoreMetrics {
    /// Track metrics for a particular agent name.
    ///
    /// - `for_agent` name of the agent these metrics are tracking.
    /// - `listen_port` port to start the HTTP server on.
    /// - `registry` prometheus registry to attach the metrics to
    pub fn new(for_agent: &str, listen_port: u16, registry: Registry) -> prometheus::Result<Self> {
        let const_labels: HashMap<String, String> = labels! {
            namespaced!("baselib_version") => env!("CARGO_PKG_VERSION").into(),
            "agent".into() => for_agent.into(),
        };
        let const_labels_ref = const_labels
            .iter()
            .map(|(k, v)| (k.as_str(), v.as_str()))
            .collect::<HashMap<_, _>>();

        let span_durations = register_counter_vec_with_registry!(
            opts!(
                namespaced!("span_duration_seconds"),
                "Duration from tracing span creation to span destruction",
                const_labels_ref
            ),
            &["span_name", "span_target"],
            registry
        )?;

        let span_counts = register_int_counter_vec_with_registry!(
            opts!(
                namespaced!("span_count"),
                "Number of times a span was exited",
                const_labels_ref
            ),
            &["span_name", "span_target"],
            registry
        )?;

        let span_events = register_int_counter_vec_with_registry!(
            opts!(
                namespaced!("span_events_total"),
                "Number of span events (logs and time metrics) emitted by level",
                const_labels_ref
            ),
            &["event_level"],
            registry
        )?;

        let last_known_message_nonce = register_int_gauge_vec_with_registry!(
            opts!(
                namespaced!("last_known_message_nonce"),
                "Last known message nonce",
                const_labels_ref
            ),
            &["phase", "origin", "remote"],
            registry
        )?;

        let validator_checkpoint_index = register_int_gauge_vec_with_registry!(
            opts!(
                namespaced!("validator_checkpoint_index"),
                "Observed signed checkpoint indices per validator",
                const_labels_ref
            ),
            &["origin", "validator"],
            registry
        )?;

        let submitter_queue_length = register_int_gauge_vec_with_registry!(
            opts!(
                namespaced!("submitter_queue_length"),
                "Submitter queue length",
                const_labels_ref
            ),
            &["remote", "queue_name"],
            registry
        )?;

        let latest_checkpoint = register_int_gauge_vec_with_registry!(
            opts!(
                namespaced!("latest_checkpoint"),
                "Mailbox latest checkpoint",
                const_labels_ref
            ),
            &["phase", "chain"],
            registry
        )?;

        let operations_processed_count = register_int_counter_vec_with_registry!(
            opts!(
                namespaced!("operations_processed_count"),
                "Number of operations processed",
                const_labels_ref
            ),
            &["phase", "chain"],
            registry
        )?;

        let messages_processed_count = register_int_counter_vec_with_registry!(
            opts!(
                namespaced!("messages_processed_count"),
                "Number of messages processed",
                const_labels_ref
            ),
            &["origin", "remote"],
            registry
        )?;

        Ok(Self {
            agent_name: for_agent.into(),
            registry: registry.clone(),
            listen_port,
            const_labels,
            // server: Arc::new(Server::new(listen_port, registry)),
            span_durations,
            span_counts,
            span_events,
            last_known_message_nonce,
            validator_checkpoint_index,
            submitter_queue_length,
            operations_processed_count,
            messages_processed_count,
            latest_checkpoint,
            json_rpc_client_metrics: OnceLock::new(),
            provider_metrics: OnceLock::new(),
        })
    }

    /// Create the provider metrics attached to this core metrics instance.
    pub fn provider_metrics(&self) -> MiddlewareMetrics {
        self.provider_metrics
            .get_or_init(|| {
                create_provider_metrics(self).expect("Failed to create provider metrics!")
            })
            .clone()
    }

    /// Create the json rpc provider metrics attached to this core metrics
    /// instance.
    pub fn json_rpc_client_metrics(&self) -> JsonRpcClientMetrics {
        self.json_rpc_client_metrics
            .get_or_init(|| {
                create_json_rpc_client_metrics(self).expect("Failed to create rpc client metrics!")
            })
            .clone()
    }

    /// Create and register a new int gauge.
    pub fn new_int_gauge(
        &self,
        metric_name: &str,
        help: &str,
        labels: &[&str],
    ) -> Result<IntGaugeVec> {
        Ok(register_int_gauge_vec_with_registry!(
            opts!(namespaced!(metric_name), help, self.const_labels_str()),
            labels,
            self.registry
        )?)
    }

    /// Create and register a new gauge.
    pub fn new_gauge(&self, metric_name: &str, help: &str, labels: &[&str]) -> Result<GaugeVec> {
        Ok(register_gauge_vec_with_registry!(
            opts!(namespaced!(metric_name), help, self.const_labels_str()),
            labels,
            self.registry
        )?)
    }

    /// Create and register a new counter.
    pub fn new_counter(
        &self,
        metric_name: &str,
        help: &str,
        labels: &[&str],
    ) -> Result<CounterVec> {
        Ok(register_counter_vec_with_registry!(
            opts!(namespaced!(metric_name), help, self.const_labels_str()),
            labels,
            self.registry
        )?)
    }

    /// Create and register a new int counter.
    pub fn new_int_counter(
        &self,
        metric_name: &str,
        help: &str,
        labels: &[&str],
    ) -> Result<IntCounterVec> {
        Ok(register_int_counter_vec_with_registry!(
            opts!(namespaced!(metric_name), help, self.const_labels_str()),
            labels,
            self.registry
        )?)
    }

    /// Create and register a new histogram.
    pub fn new_histogram(
        &self,
        metric_name: &str,
        help: &str,
        labels: &[&str],
        buckets: Vec<f64>,
    ) -> Result<HistogramVec> {
        Ok(register_histogram_vec_with_registry!(
            histogram_opts!(
                namespaced!(metric_name),
                help,
                buckets,
                self.const_labels.clone()
            ),
            labels,
            self.registry
        )?)
    }

    /// Reports the current highest message nonce at multiple phases of the
    /// relaying process. There may be messages that have not reached a certain
    /// stage, such as being fully processed, even if the reported nonce is
    /// higher than that message's nonce.
    ///
    /// Some phases are not able to report the remote chain, but origin chain is
    /// always reported.
    ///
    /// Labels:
    /// - `phase`: The phase the nonce is being tracked at, see below.
    /// - `origin`: Origin chain the message comes from. Can be "any"
    /// - `remote`: Remote chain for the message. This will skip values because
    ///   the nonces are contiguous by origin not remote. Can be "any"
    ///
    /// The following phases are implemented:
    /// - `dispatch`: Highest nonce which has been indexed on the mailbox
    ///   contract syncer and stored in the relayer DB.
    /// - `processor_loop`: Highest nonce which the MessageProcessor loop has
    ///   gotten to but not attempted to send it.
    /// - `message_processed`: When a nonce was processed as part of the
    ///   MessageProcessor loop.
    pub fn last_known_message_nonce(&self) -> IntGaugeVec {
        self.last_known_message_nonce.clone()
    }

    /// Gauge for reporting the most recent validator checkpoint index
    /// Labels:
    /// - `origin`: Origin chain
    /// - `validator`: Address of the validator
    pub fn validator_checkpoint_index(&self) -> IntGaugeVec {
        self.validator_checkpoint_index.clone()
    }

    /// Latest message nonce in the validator.
    ///
    /// Phase:
    /// - `validator_observed`: When the validator has observed the checkpoint
    ///   on the mailbox contract.
    /// - `validator_processed`: When the validator has written this checkpoint.
    pub fn latest_checkpoint(&self) -> IntGaugeVec {
        self.latest_checkpoint.clone()
    }

    /// Measure of the queue lengths in Submitter instances
    ///
    /// Labels:
    /// - `remote`: Remote chain the queue is for.
    /// - `queue_name`: Which queue the message is in.
    pub fn submitter_queue_length(&self) -> IntGaugeVec {
        self.submitter_queue_length.clone()
    }

    /// The number of operations successfully submitted by this process during
    /// its lifetime.
    ///
    /// Tracks the number of operations to go through each stage.
    ///
    /// Labels:
    /// - `phase`: Phase of the operation submission process.
    /// - `chain`: Chain the operation was submitted to.
    ///
    /// The following phases have been implemented:
    /// - `prepared`: When the operation has been prepared for submission. This
    ///   is a pipelining step that happens before submission and may need to be
    ///   re-done.
    /// - `submitted`: When the operation has been submitted to the chain but is
    ///   not yet certain to be included after a re-org.
    /// - `confirmed`: When the operation has been confirmed to have made it
    ///   into the chain after the reorg window has passed.
    /// - `reorged`: When the operation was not included and needs to be
    ///   reprocessed.
    /// - `failed`: When some part of the pipeline failed. The operation may
    ///   still be retried later.
    /// - `dropped`: When the operation was dropped from the pipeline. This may
    ///   or may not be because of an error.
    pub fn operations_processed_count(&self) -> IntCounterVec {
        self.operations_processed_count.clone()
    }

    /// The number of messages successfully submitted by this process during its
    /// lifetime.
    ///
    /// The value of
    /// `hyperlane_last_known_message_nonce{phase=message_processed}`
    /// should refer to the maximum nonce value we ever successfully
    /// delivered. Since deliveries can happen out-of-index-order, we
    /// separately track this counter referring to the number of successfully
    /// delivered messages.
    ///
    /// Labels:
    /// - `origin`: Chain the message came from.
    /// - `remote`: Chain we delivered the message to.
    pub fn messages_processed_count(&self) -> IntCounterVec {
        self.messages_processed_count.clone()
    }

    /// Measure of span durations provided by tracing.
    ///
    /// Labels:
    /// - `span_name`: name of the span. e.g. the function name.
    /// - `span_target`: a string that categorizes part of the system where the
    ///   span or event occurred. e.g. module path.
    pub fn span_duration_seconds(&self) -> CounterVec {
        self.span_durations.clone()
    }

    /// Measure of measuring how many given times a span was exited.
    ///
    /// Labels:
    /// - `span_name`: name of the span. e.g. the function name.
    /// - `span_target`: a string that categorizes part of the system where the
    ///   span or event occurred. e.g. module path.
    pub fn span_count(&self) -> IntCounterVec {
        self.span_counts.clone()
    }

    /// Counts of tracing (logging framework) span events.
    ///
    /// Tracking the number of events emitted helps us verify logs are not being
    /// dropped and provides a quick way to query error and warning counts.
    ///
    /// Labels:
    /// - `event_level`: level of the event, i.e. trace, debug, info, warn,
    ///   error.
    pub fn span_events(&self) -> IntCounterVec {
        self.span_events.clone()
    }

    /// Gather available metrics into an encoded (plaintext, OpenMetrics format)
    /// report.
    pub fn gather(&self) -> prometheus::Result<Vec<u8>> {
        let collected_metrics = self.registry.gather();
        let mut out_buf = Vec::with_capacity(1024 * 64);
        let encoder = prometheus::TextEncoder::new();
        encoder.encode(&collected_metrics, &mut out_buf)?;
        Ok(out_buf)
    }

    // pub fn run_http_server(&self) -> JoinHandle<()> {
    //     self.server.clone().run()
    // }

    /// Get the name of this agent, e.g. "relayer"
    pub fn agent_name(&self) -> &str {
        &self.agent_name
    }

    fn const_labels_str(&self) -> HashMap<&str, &str> {
        self.const_labels
            .iter()
            .map(|(k, v)| (k.as_str(), v.as_str()))
            .collect()
    }
}

impl Debug for CoreMetrics {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "CoreMetrics {{ agent_name: {}, listen_port: {:?} }}",
            self.agent_name, self.listen_port
        )
    }
}
