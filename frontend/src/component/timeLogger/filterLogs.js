import {Button, DatePicker, Form, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const FilterLogs = () => {

    return <div>
        <Form layout={'inline'} size={'small'}>
            <Form.Item>
                <DatePicker.RangePicker/>
            </Form.Item>
            <Form.Item>
                <Input placeholder={"Search in description"} style={{width: '400px'}}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType={'submit'} icon={<SearchOutlined/>} type={'primary'}>Filter</Button>
            </Form.Item>
        </Form>
    </div>
}

export default FilterLogs;