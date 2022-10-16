import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogs, toggleLoading} from "../../rtk/timeLogger/slices";
import {Card, Divider, notification, Row,} from "antd";
import NewTimeLogger from "./newTimeLogger";
import LogOfTheDay from "./logOfTheDay";

const TimeLogger = () => {
    const {isLoggedIn} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(toggleLoading())
            dispatch(fetchLogs())
        } else {
            notification.error({
                message: "You need to login!",
                description: "This app is available for logged in users only"
            })
        }

    }, [])

    return <Row>
        <Card style={{width: '30%'}}>
            <Divider>Enter New Log</Divider>
            <NewTimeLogger/>
        </Card>
        <Card style={{width: '70%'}}>
            <Divider>Today's Logs</Divider>
            <LogOfTheDay/>
        </Card>
    </Row>
}

export default TimeLogger;