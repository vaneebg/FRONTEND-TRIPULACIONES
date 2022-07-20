
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import './AboutUs.scss'
import imgVane from '../../assets/vane.jpg'
import imgRebeca from '../../assets/OriolHome.jpeg'

const AboutUs = () => {
  return (<>

    <h2>Aplicación creada por:</h2>
    <div className="about">
      <div className="target">

        <span>Germán MT</span>
        <div className="iconsSocial">
          <a href="https://www.linkedin.com/in/moltorger/"><LinkedinOutlined className='svg' /></a>
          <a href="https://github.com/Molerog"><GithubOutlined className='svg' /></a>
        </div>
      </div>
      <div className="target">
        <span>Vicente BC</span>
        <div className="iconsSocial">
          <a href="https://www.linkedin.com/in/vibarcar/"><LinkedinOutlined className='svg' /></a>
          <a href="https://github.com/Vincecoorp21"><GithubOutlined className='svg' /></a>
        </div>
      </div>
      <div className="target">
        <img className="imgAuth" src={imgRebeca} alt="Oriol" />
        <span>Rebeca AS</span>
        <div className="iconsSocial">
          <a href="https://www.linkedin.com/in/rebeca-as/"><LinkedinOutlined className='svg' /></a>
          <a href="https://github.com/RebecaASuesta"><GithubOutlined className='svg' /></a>
        </div>
      </div>
      <div className="target">
        <img className='imgAuth' src={imgVane} alt="Vane" />
        <span>Vanesa BG</span>
        <div className="iconsSocial">
          <a href="https://www.linkedin.com/in/vanesa-bg/"><LinkedinOutlined className='svg' /></a>
          <a href="https://github.com/vaneebg"><GithubOutlined className='svg' /></a>
        </div>
      </div>
    </div>
  </>
  )
}

export default AboutUs