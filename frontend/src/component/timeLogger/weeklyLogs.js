import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchWeeklyLogs, toggleWeeklyLoading} from "../../rtk/timeLogger/slices";
import {CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const Chart = ({data}) => {
    return (
        <LineChart data={data} width={800} height={350} margin={{right: 35}}>
            <Line name={"This week"} dataKey={"thisWeek"} type={"linear"} stroke={"#1DA57A"}/>
            <Line name={"Previous week"} dataKey={"prevWeek"} type={"linear"} stroke={"#8340b6"}/>

                <XAxis dataKey={"day"} label={'Day'} dy={-20} dx={20}/>

                <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>

                <YAxis dy={20}>
                    <Label value={'Duration (Minutes)'} angle={270} dx={-20}/>
                </YAxis>


        </LineChart>

    );
};


const WeeklyLogs = () => {
    const {logs, isLoading} = useSelector(state => state.timeLogger.weeklyLogs);
    const {isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // let dt=[];


    useEffect(() => {
        if (isLoggedIn) {
            dispatch(toggleWeeklyLoading());
            dispatch(fetchWeeklyLogs());
        }
    }, [isLoggedIn]);

    return (
        <div className="App">
            {!isLoading && <Chart data={logs}/>}
        </div>
    );
}

export default WeeklyLogs;