import spider_home2 from "../assets/spidermon_home.png";
import eye from "../assets/eye.gif";
import boo from "../assets/boo.gif";
import "./index.scss";

export const Bg = () => {
  return (
    <div className="bg">
      <div className="bg__container">
        <img src={spider_home2} alt="spider" className="s-h-1" />
        <img src={spider_home2} alt="spidermon" className="s-h-2" />
        <img src={eye} alt="eye" className="eye-1" />
        <img src={eye} alt="eye" className="eye-2" />
        <img src={boo} alt="boo" className="boo-1" />
        <img src={boo} alt="boo" className="boo-2" />
      </div>
    </div>  
  );
};
