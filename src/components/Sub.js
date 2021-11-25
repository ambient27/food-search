const Sub = (props) => {
    return (
      <li>
        <h2>{props.key}</h2>
        <h3>{props.substitute}</h3>
        <p>{props.message}</p>
      </li>
    );
  };
  
  export default Sub;
  