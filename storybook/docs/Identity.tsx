import { tokens } from "../../packages/ui/src/quarks/tokens";
export function ColourTokens() {
  return (
    <div className="csp-token-list">
      {Object.entries(tokens.colors).map(([name, value]) => (
        <div key={name} className="csp-token-item">
          <span style={{ background: value }} aria-hidden="true" />
          <strong>{name}</strong>
          <code>{value}</code>
        </div>
      ))}
    </div>
  );
}
export function SpacingTokens() {
  return (
    <table className="csp-doc-table">
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(tokens.spacing).map(([name, value]) => (
          <tr key={name}>
            <td>
              <code>space-{name}</code>
            </td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
