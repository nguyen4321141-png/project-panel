/**
 * GlobalEventMonitor
 *
 * Lightweight publish-subscribe singleton that monitors system-level
 * browser events relevant to screen privacy (tab visibility, window focus).
 *
 * Usage:
 *   const unsub = GlobalEventMonitor.subscribe('TAB_HIDDEN', () => { ... });
 *   // later:
 *   unsub();
 */

const _channels = new Map();
let _initialized = false;

export const GlobalEventMonitor = {
  /**
   * Subscribe to a named event channel.
   * @param {string} channel
   * @param {function} callback
   * @returns {function} unsubscribe function
   */
  subscribe(channel, callback) {
    if (!_channels.has(channel)) {
      _channels.set(channel, new Set());
    }
    _channels.get(channel).add(callback);
    return () => _channels.get(channel)?.delete(callback);
  },

  /**
   * Emit an event on a named channel with an optional payload.
   * @param {string} channel
   * @param {*} payload
   */
  emit(channel, payload) {
    _channels.get(channel)?.forEach(fn => {
      try { fn(payload); } catch (err) { console.error('[GlobalEventMonitor]', err); }
    });
  },

  /**
   * Bootstrap browser event listeners. Idempotent — safe to call multiple times.
   */
  init() {
    if (_initialized) return;
    _initialized = true;

    // Page Visibility API
    document.addEventListener('visibilitychange', () => {
      const hidden = document.hidden;
      GlobalEventMonitor.emit(hidden ? 'TAB_HIDDEN' : 'TAB_VISIBLE', { hidden });
    });

    // Window focus/blur
    window.addEventListener('blur',  () => GlobalEventMonitor.emit('WINDOW_BLUR',  {}));
    window.addEventListener('focus', () => GlobalEventMonitor.emit('WINDOW_FOCUS', {}));

    // Pointer lock escape (fullscreen media scenarios)
    document.addEventListener('pointerlockchange', () => {
      if (!document.pointerLockElement) {
        GlobalEventMonitor.emit('POINTER_LOCK_RELEASED', {});
      }
    });
  },

  /** Tear down — primarily for unit tests */
  reset() {
    _channels.clear();
    _initialized = false;
  },
};
