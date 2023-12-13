function Text({ name, id, value, disabled }: PropsInput) {
    return (
      <input type="text" name={name} id={id} value={value} className="" disabled={disabled ?? false} />
    );
  }
  
  export default Text;

  type PropsInput = {
    name: string;
    id: string;
    value?: any;
    disabled?: boolean
  }