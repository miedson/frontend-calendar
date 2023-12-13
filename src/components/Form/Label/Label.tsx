function Label ({ labelFor, children }: PropsLabel) {
    return (
        <label htmlFor={labelFor}>{children}</label>
    );
  }
  
  export default Label;

  type PropsLabel = {
    labelFor: string,
    children: string
  }