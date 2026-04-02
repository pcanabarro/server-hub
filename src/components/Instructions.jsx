export default function Instructions({ steps, accentColor }) {
  return (
    <div className="instructions">
      <h3>⚡ Setup Instructions</h3>
      <ol className="steps">
        {steps.map((step, i) => (
          <li key={i}>
            <span
              className="step-num"
              style={
                accentColor
                  ? {
                      background: `${accentColor}22`,
                      borderColor: `${accentColor}4d`,
                      color: accentColor,
                    }
                  : undefined
              }
            >
              {i + 1}
            </span>
            <span dangerouslySetInnerHTML={{ __html: step }} />
          </li>
        ))}
      </ol>
    </div>
  );
}
