import './App.less';
import Sidebar from "./component/Sidebar";
import {Layout} from "antd";
import Todo from "./component/todo";
import {Route, Routes} from "react-router-dom";
import Stackoverflow from "./component/stackoverflow";
import Credits from "./component/credits";
import Resume from "./component/resume";
import Login from "./component/auth/login";
import TimeLogger from "./component/timeLogger";
// import Resume from "react-single-page-resume";
// import data from './dat.json'

const {Sider, Content} = Layout
const App = () => {
    return (
        <Layout hasSider className="site-layout" style={{minHeight: '100vh', background: '#fff'}}>
            <Sider collapsible={true} className={'side-nav'} collapsedWidth={40}>
                <div className={'logo'}/>
                <Sidebar/>
            </Sider>
            <Content style={{margin: 0, background: '#fff'}}>
                <Routes>
                    <Route path={'/'} element={<Resume/>}/>
                    <Route path={'/demo/todo'} element={<Todo/>}/>
                    <Route path={'/demo/time-logger'} element={<TimeLogger/>}/>
                    <Route path={'/stackoverflow'} element={<Stackoverflow/>}/>
                    <Route path={'/credits'} element={<Credits/>}/>
                    <Route path={'*'} element={<>
                        <div style={{textAlign: 'center', padding: '200px'}}><h2>Error 404</h2><h5>Seems like you have
                            come to the end of the world!</h5></div>
                    </>}/>
                </Routes>
            </Content>
            <Login/>
        </Layout>
    );
}

export default App;
