import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchLogs, toggleLoading} from "../../rtk/timeLogger/slices";
import {Card, Divider, Row,} from "antd";
import NewTimeLogger from "./newTimeLogger";
import LogOfTheDay from "./logOfTheDay";

const TimeLogger = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleLoading())
        dispatch(fetchLogs())

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