
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";


const AboutUs = () => {
  return (
    <div>
        <h2>Aplicación creada por:</h2>
        <span>Germán MT</span> <a href="https://www.linkedin.com/in/moltorger/"><LinkedinOutlined className='svg' /></a>
        <a href="https://github.com/Molerog"><GithubOutlined className='svg' /></a><br />
        <span>Vicente BC</span><a href="https://www.linkedin.com/in/vibarcar/"><LinkedinOutlined className='svg' /></a>
        <a href="https://github.com/Vincecoorp21"><GithubOutlined className='svg' /></a> <br />
        <span>Rebeca AS</span><a href="https://www.linkedin.com/in/rebeca-as/"><LinkedinOutlined className='svg' /></a>
        <a href="https://github.com/RebecaASuesta"><GithubOutlined className='svg' /></a> <br />
        <span>Vanesa BG</span>  <a href="https://www.linkedin.com/in/vanesa-bg/"><LinkedinOutlined className='svg' /></a>
        <a href="https://github.com/vaneebg"><GithubOutlined className='svg' /></a>
    </div>
  )
}

export default AboutUs