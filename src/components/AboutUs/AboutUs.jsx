
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons"
import './AboutUs.scss'
import imgVane from '../../assets/vane.jpg'
import imgRebeca from '../../assets/OriolHome.jpeg'
import imgGerman from '../../assets/Marisa.webp'
import imgVincent from '../../assets/Vicenta.webp'

const AboutUs = () => {
  return (
    <div className="mainContainer">
      <div className="aboutUs">
        <div className="text">
          <h2>Aplicación creada por</h2>
        </div>

        <div className="about">
          <div className="target">
            <div className="img">
              <img className="imgAuth" src={imgGerman} alt="German" />
            </div>
            <div className="data">
              <h2 className="name">Germán MT</h2>
              <div className="iconsSocial">
                <a href="https://www.linkedin.com/in/moltorger/"><LinkedinOutlined className='svg' /></a>
                <a href="https://github.com/Molerog"><GithubOutlined className='svg' /></a>
              </div>
            </div>
          </div>

          <div className="target">
            <div className="img">
              <img className="imgAuth" src={imgRebeca} alt="Oriol" />
            </div>
            <div className="data">
              <h2 className="name">Rebeca AS</h2>
              <div className="iconsSocial">
                <a href="https://www.linkedin.com/in/rebeca-as/"><LinkedinOutlined className='svg' /></a>
                <a href="https://github.com/RebecaASuesta"><GithubOutlined className='svg' /></a>
              </div>
            </div>
          </div>

          <div className="target">
            <div className="img">
              <img className='imgAuth' src={imgVane} alt="Vane" />
            </div>
            <div className="data">
              <h2 className="name">Vanesa BG</h2>
              <div className="iconsSocial">
                <a href="https://www.linkedin.com/in/vanesa-bg/"><LinkedinOutlined className='svg' /></a>
                <a href="https://github.com/vaneebg"><GithubOutlined className='svg' /></a>
              </div>
            </div>
          </div>

          <div className="target">
            <div className="img">
              <img className="imgAuth" src={imgVincent} alt="Vincent" />
            </div>
            <div className="data">
              <h2 className="name">Vicente BC</h2>
              <div className="iconsSocial">
                <a href="https://www.linkedin.com/in/vibarcar/"><LinkedinOutlined className='svg' /></a>
                <a href="https://github.com/Vincecoorp21"><GithubOutlined className='svg' /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs