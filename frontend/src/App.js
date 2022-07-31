import './App.less';
import Sidebar from "./component/Sidebar";
import {Layout} from "antd";
import Resume from "./component/resume";
import Todo from "./component/todo";
import {Route, Routes} from "react-router-dom";
import Stackoverflow from "./component/stackoverflow";
import Credits from "./component/credits";

const {Sider, Content} = Layout
const App = () => {

    return (
        <Layout className="site-layout" style={{minWidth: '1250px', minHeight: '100vh'}}>
            <Sider collapsible={true}>
                <Sidebar/>
            </Sider>
            <Content style={{margin: '0 16px'}}>
                <Routes>
                    <Route path={''} element={<Resume/>}/>
                    <Route path={'/demo/todo'} element={<Todo/>}/>
                    <Route path={'/stackoverflow'} element={<Stackoverflow/>}/>
                    <Route path={'/credits'} element={<Credits/>}/>
                    <Route path={'*'} element={<>
                        <div style={{textAlign: 'center', padding: '200px'}}><h2>Error 404</h2><h5>Seems like you have
                            come to the end of the world!</h5></div>
                    </>}/>
                </Routes>
                {/*{currentNavItem === 'resume' ? <Resume/> :*/}
                {/*    currentNavItem === 'to-do' ? <Todo/> :*/}
                {/*        currentNavItem === 'stackoverflow' ? <Stackoverflow/> :*/}
                {/*            currentNavItem === 'credits' ? <Credits/> : ''*/}
                {/*}*/}
            </Content>
        </Layout>
    );
}

export default App;
