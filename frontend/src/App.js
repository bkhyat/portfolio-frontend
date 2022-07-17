import './App.css';
import Sidebar from "./component/Sidebar";
import {Layout} from "antd";
import {useSelector} from "react-redux";
import Profile from "./component/resume/Profile";
import StackoverflowProfile from "./component/stackoverflow/stackoverflowProfile";

const {Header, Sider, Content, Footer} = Layout
const App = () => {
    const {currentNavItem} = useSelector(state => state.nav)
    return (
        <Layout style={{height: '100vh'}}>
            <Sider collapsible={true}>

                <Sidebar/>
            </Sider>
        <Layout className="site-layout">
            <Header>
                <h1 style={{textAlign: 'center', color: '#a0d3c0'}}>Bikhyat Adhikari</h1>
            </Header>
            <Content style={{margin: '0 16px'}}>
                {currentNavItem === 'profile' ? <Profile/> :
                    currentNavItem === 'stackoverflow' ? <StackoverflowProfile/> : ''}
            </Content>
            <Footer style={{textAlign: 'center'}}>The portfolio is created using Django, and React.
                The frontend is deployed on GitHub, and backend is hosted @pythonanywhere.com
            </Footer>
        </Layout>
    </Layout>
  );
}

export default App;
