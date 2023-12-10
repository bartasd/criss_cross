import cross from "../img/cross.svg";
import style from "./Button.module.css";

export function Button(props) {
  function on() {
    if (!props.active[0] && props.end === false) {
      props.phone(props.id);
    }
  }

  const cl_user = " " + style.user;
  const cl_pc = " " + style.pc;
  let st = props.className + " " + style.element;

  if (props.active[0]) {
    if (props.active[1]) {
      st += cl_user;
    } else {
      st += cl_pc;
    }
  }

  return (
    <div className={st} onClick={on}>
      <img
        className={style.toxic}
        style={{ display: props.active[0] ? "block" : "none" }}
        src={cross}
        alt="cross"
      />
    </div>
  );
}
