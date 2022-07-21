import './App.css';
import Sidebar from "./component/Sidebar";
import {Layout} from "antd";
import {useSelector} from "react-redux";
import StackoverflowProfile from "./component/stackoverflow/stackoverflowProfile";
import Credits from "./component/credits";
import Resume from "./component/resume";

const {Sider, Content} = Layout
const App = () => {
    const {currentNavItem} = useSelector(state => state.nav)
    return (
        <Layout className="site-layout" style={{height: '100vh'}}>
            <Sider collapsible={true}>
                <Sidebar/>
            </Sider>
            <Content style={{margin: '0 16px'}}>
                {currentNavItem === 'resume' ? <Resume/> :
                    currentNavItem === 'stackoverflow' ? <StackoverflowProfile/> :
                        currentNavItem === 'credits' ? <Credits/> : ''
                }
            </Content>
        </Layout>
    );
}

export default App;
