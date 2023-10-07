import Practice from "./practice";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row, Tree} from "antd";
import {setSelectedSet} from "../../../rtk/vocab/slices";
export default Practice;

export const PracticeSets = () => {
    const {allSets, selectedSet} = useSelector(state => state.vocab.practiceSet)
    const dispatch = useDispatch()

    return <Row>
        <Col span={6} >
        Sets
        <Tree
            selectedKeys={selectedSet}
            onSelect ={(key, e) => dispatch(setSelectedSet([e.node.id]))}
            showLine={true}
            bordered={true}
            height={"90vh"}
            treeData={(allSets||[])}
            fieldNames={{title: "category_name", key: "id"}}
        /></Col>
        <Col>
            <Practice />
        </Col>
    </Row>
}