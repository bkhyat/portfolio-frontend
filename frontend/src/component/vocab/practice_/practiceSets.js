import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Carousel, Col, Modal, Row, Table} from "antd";
import {useEffect, useState} from "react";
import {fetchWordsInPages, setCurrentPage} from "../../../rtk/vocab_/slices";
import {isVisible} from "@testing-library/user-event/dist/utils";
import Practice from "./practice";


export const PracticeSets = () => {
    const dispatch = useDispatch()
    const {pageCount, currentPage} = useSelector(state => state.vocab.practiceSet)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleIsModalVisible = () => setIsModalVisible(isVisible => !isVisible)
    // useEffect(() => {
    //     if(currentPage>0){
    //         dispatch(fetchWordsInPages({page: currentPage}))
    //     }
    // }, [currentPage])

    // return <Card bordered={false} title={"Practice Sets"}>
    //     {[...Array(pageCount)].map((i, index) => <Card.Grid style={{width: '10%', cursor: 'pointer'}}>Set {index+1}</Card.Grid>)}
    // </Card>
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return <div style={{textAlign: 'center'}}>
        <Button type={'primary'} onClick={() => setIsModalVisible(true)}>Practice</Button>

        <Modal
            style={{width: '600px'}}
            bodyStyle={{height: '450px'}}
            visible={isModalVisible}
            title={'Practice'}
            footer={null}
            onCancel={() => setIsModalVisible(false)}
        >
            <h3 style={{textAlign: 'center'}}>Practice Sets</h3>
            {/*<Carousel effect={'fade'} afterChange={(index) => dispatch(setCurrentPage(index+1))}>*/}
            <Row>
                <Col>
                    <Table

                        size={'small'}
                        pagination={false}
                        style={{overflow: 'auto', height: '250px'}}
                        dataSource={[...Array(pageCount)].map((i, index) => ({
                            key: index,
                            label: `Practice set ${index}`
                        }))}
                        columns={[{title: 'Set', key: 'label', dataIndex: 'label'}]}
                    /></Col>
                <Col>

                    {currentPage > 0 && <h3 style={{textAlign: 'center'}}>Practice Now</h3>}
                    <Practice/>
                </Col>
            </Row>
            {/*{[...Array(pageCount)].map((i, index) => <div><h3 style={contentStyle}>Set {index+1}</h3></div>)}*/}
            {/*</Carousel>*/}
        </Modal>
    </div>

}

export default PracticeSets;