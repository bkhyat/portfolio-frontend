import './App.less';
import Sidebar from "./component/Sidebar";
import {Layout} from "antd";
import {useSelector} from "react-redux";
import Credits from "./component/credits";
import Resume from "./component/resume";
import Todo from "./component/todo";
import Stackoverflow from "./component/stackoverflow";

const {Sider, Content} = Layout
const App = () => {
    const {currentNavItem} = useSelector(state => state.nav)

    return (
        <Layout className="site-layout" style={{minWidth: '1250px', minHeight: '100vh'}}>
            <Sider collapsible={true}>
                <Sidebar/>
            </Sider>
            <Content style={{margin: '0 16px'}}>
                {currentNavItem === 'resume' ? <Resume/> :
                    currentNavItem === 'to-do' ? <Todo/> :
                        currentNavItem === 'stackoverflow' ? <Stackoverflow/> :
                            currentNavItem === 'credits' ? <Credits/> : ''
                }
            </Content>
        </Layout>
    );
}

export default App;
