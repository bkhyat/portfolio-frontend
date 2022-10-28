import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchWeeklyLogs, toggleWeeklyLoading } from "../../rtk/timeLogger/slices";
// import { LineChart } from "recharts/src/chart/LineChart";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const Chart = ({ data }) => {
    return (
      <LineChart width={400} height={400} data={data} showLoading={true}>
          <Line
            type="monotone"
            dataKey="thisWeek"
            stroke="green"
            yAxisId="left"
            showLoading={true}
          />
          <Line type="monotone" dataKey="prevWeek" stroke="blue" yAxisId="right" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="key" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
      </LineChart>
    );
};

const WeeklyLogs = () => {
    const { logs, isLoading } = useSelector(state => state.timeLogger.weeklyLogs);
    const dispatch = useDispatch();
    // let dt=[];


    useEffect(() => {
        dispatch(toggleWeeklyLoading());
        dispatch(fetchWeeklyLogs());
    }, []);

    return (
      <div className="App">
          {!isLoading && <Chart data={logs} />}
      </div>
    );
}
// return <div>
{/*<Table*/
}
{/*    pagination={false}*/
}
{/*    size={'small'}*/
}
{/*    columns={[*/
}
{/*        {*/
}
{/*            key: 'day',*/
}
{/*            dataIndex: 'day',*/
}
{/*            title: 'Day'*/
}
{/*        },*/
}
{/*        {*/
}
{/*            key: 'prevWeek',*/
}
{/*            dataIndex: 'prevWeek',*/
}
{/*            title: 'Previous Week',*/
}
{/*            render: (val) => convertMinutesToTime(Number(val))*/
}
{/*        },*/
}
{/*        {*/
}
{/*            key: 'thisWeek',*/
}
{/*            dataIndex: 'thisWeek',*/
}
{/*            title: 'This Week',*/
}
{/*            render: (val) => convertMinutesToTime(Number(val))*/
}
{/*        }*/
}
{/*    ]}*/
}
{/*    dataSource={weeklyLogs}*/
}
{/*    summary={() => (*/
}
{/*        <Table.Summary fixed>*/
}
{/*            <Table.Summary.Row>*/
}
{/*                <Table.Summary.Cell index={0}>Total Logged</Table.Summary.Cell>*/
}
{/*                <Table.Summary.Cell*/
}
{/*                    index={1}>{convertMinutesToTime(weeklyLogs.map((item => item.prevWeek)).reduce((a, b) => a + b, 0))}</Table.Summary.Cell>*/
}
{/*                <Table.Summary.Cell*/
}
{/*                    index={2}>{convertMinutesToTime(weeklyLogs.map((item => item.thisWeek)).reduce((a, b) => a + b, 0))}</Table.Summary.Cell>*/
}
{/*            </Table.Summary.Row>*/
}
{/*        </Table.Summary>*/
}
{/*    )}*/
}
{/*/>*/
}
{/*<LineChart data={weeklyLogs} width={400} height={300}>*/
}
{/*  <Line*/
}
{/*    dataKey={"thisWeek"}*/
}
{/*    type={"monotone"}*/
}
{/*    stroke={"#BB0000"}*/
}
{/*  />*/
}
{/*  <Line dataKey={"prevWeek"} type={"monotone"} stroke={"#abc000"}/>*/
}
{/*  <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />*/
}
{/*  <Tooltip />*/
}
{/*  <Legend />*/
}
{/*  <XAxis dataKey={"day"}/>*/
}
{/*  <YAxis />*/
}
{/*</LineChart>*/
}
//   </div>;
// };

export default WeeklyLogs;