/**
 * DocBlock
 *
 * Renders a convincing API reference / code documentation panel.
 * Displayed in place of the media widget when isPrivate === true.
 */
export default function DocBlock() {
  return (
    <div className="font-mono text-[11.5px] leading-relaxed text-nx-text overflow-y-auto max-h-[420px] p-1">

      {/* Section header */}
      <div className="doc-comment mb-3">
        {'/** '}
        <br />
        {' * @module nexus-sdk/cache'}
        <br />
        {' * @version 4.2.1'}
        <br />
        {' * @since 2023-09-14'}
        <br />
        {' */'}
      </div>

      {/* Import block */}
      <div className="mb-4">
        <span className="doc-keyword">import</span>
        {' { '}
        <span className="doc-type">CacheClient</span>
        {', '}
        <span className="doc-type">CachePolicy</span>
        {' } '}
        <span className="doc-keyword">from</span>
        {' '}
        <span className="doc-string">'@nexus/sdk'</span>
        {';'}
      </div>

      {/* Interface definition */}
      <div className="mb-4">
        <div className="doc-comment">{'// CachePolicy interface'}</div>
        <span className="doc-keyword">interface </span>
        <span className="doc-type">CachePolicy</span>
        {' {'}
        <div className="pl-4">
          <div>
            <span className="text-nx-text">ttlSeconds</span>
            {': '}
            <span className="doc-type">number</span>
            {';'}
          </div>
          <div>
            <span className="text-nx-text">strategy</span>
            {': '}
            <span className="doc-string">'lru'</span>
            {' | '}
            <span className="doc-string">'lfu'</span>
            {' | '}
            <span className="doc-string">'fifo'</span>
            {';'}
          </div>
          <div>
            <span className="text-nx-text">maxSize</span>
            {'?: '}
            <span className="doc-type">number</span>
            {';  '}
            <span className="doc-comment">{'// bytes, default: 512MB'}</span>
          </div>
          <div>
            <span className="text-nx-text">tags</span>
            {'?: '}
            <span className="doc-type">string</span>
            {'[];'}
          </div>
        </div>
        {'}'}
      </div>

      {/* Function signature */}
      <div className="mb-4">
        <div className="doc-comment">
          {'/**'}
          <br />
          {'  * Initialises a distributed cache client with the given policy.'}
          <br />
          {'  * Connects to the nearest edge node automatically.'}
          <br />
          {'  *'}
          <br />
          {'  * @param  policy  CachePolicy configuration object'}
          <br />
          {'  * @returns        Resolved CacheClient instance'}
          <br />
          {'  */'}
        </div>
        <div>
          <span className="doc-keyword">async function </span>
          <span className="doc-type">createCacheClient</span>
          {'('}
        </div>
        <div className="pl-4">
          <span className="text-nx-text">policy</span>
          {': '}
          <span className="doc-type">CachePolicy</span>
          {','}
        </div>
        <div>
          {'): '}
          <span className="doc-type">Promise</span>
          {'<'}
          <span className="doc-type">CacheClient</span>
          {'> {'}
        </div>
        <div className="pl-4">
          <div>
            <span className="doc-keyword">const </span>
            <span className="text-nx-text">node</span>
            {' = '}
            <span className="doc-keyword">await </span>
            <span className="doc-type">EdgeResolver</span>
            {'.nearest();'}
          </div>
          <div>
            <span className="doc-keyword">return new </span>
            <span className="doc-type">CacheClient</span>
            {'({ node, ...policy });'}
          </div>
        </div>
        {'}'}
      </div>

      {/* Usage example */}
      <div className="mt-3 border-t border-nx-border pt-3">
        <div className="doc-comment">{'// Example usage'}</div>
        <div>
          <span className="doc-keyword">const </span>
          <span className="text-nx-text">cache</span>
          {' = '}
          <span className="doc-keyword">await </span>
          <span className="text-nx-text">createCacheClient</span>
          {'({'}
        </div>
        <div className="pl-4">
          <div>
            <span className="text-nx-text">ttlSeconds</span>
            {': '}
            <span className="doc-number">3600</span>
            {','}
          </div>
          <div>
            <span className="text-nx-text">strategy</span>
            {': '}
            <span className="doc-string">'lru'</span>
            {','}
          </div>
          <div>
            <span className="text-nx-text">maxSize</span>
            {': '}
            <span className="doc-number">536870912</span>
            {','}
          </div>
          <div>
            <span className="text-nx-text">tags</span>
            {': ['}
            <span className="doc-string">'session'</span>
            {', '}
            <span className="doc-string">'user-data'</span>
            {'],'}
          </div>
        </div>
        <div>{'});'}</div>
        <div className="mt-1">
          <span className="doc-keyword">await </span>
          <span className="text-nx-text">cache</span>
          {'.set('}
          <span className="doc-string">'user:42'</span>
          {', payload, { ttl: '}
          <span className="doc-number">900</span>
          {' });'}
        </div>
      </div>

      {/* Return value table */}
      <div className="mt-4 border-t border-nx-border pt-3">
        <div className="doc-comment mb-2">{'// CacheClient methods'}</div>
        {[
          { method: '.get(key)',          ret: 'Promise<T | null>' },
          { method: '.set(key, val, opts)','ret': 'Promise<void>' },
          { method: '.del(key)',          ret: 'Promise<boolean>' },
          { method: '.flush(tags?)',      ret: 'Promise<number>' },
          { method: '.stats()',           ret: 'Promise<CacheStats>' },
        ].map(({ method, ret }) => (
          <div key={method} className="flex gap-4">
            <span className="doc-type w-48 shrink-0">{method}</span>
            <span className="text-nx-sub">→</span>
            <span className="doc-keyword">{ret}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
