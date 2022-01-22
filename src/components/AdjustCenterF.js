import { Form,InputGroup,FormControl } from 'react-bootstrap';
import { Stack } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import "../localSCSS/MRIControls.scss";
import Button from '@mui/material/Button';
import "echarts/i18n/langFR";
import Box from '@mui/material/Box';
function AdjustCenterF({ pp, setPp, spfd, setSpfd}) {
    const option = {
        title: {
        text: '图标名称'
        },
        toolbox: {
            feature: {
                saveAsImage: {},
                dataZoom: {},
                restore: {}
            }
        },
        tooltip: {},
        legend: {
            data:['频率']
        },
        xAxis: {
            data: [51, 102, 153, 204, 255, 366]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    return (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Form className="findf-form">
                    <Form.Group className="mb-1" controlId="pp">
                        <Form.Label>频偏</Form.Label>
                        <InputGroup className="mb-1">
                            <FormControl/>
                            <InputGroup.Text id="basic-addon1">kHz</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="spfd">
                        <Form.Label>射频幅度</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="RFCaliRate">
                        <Form.Check type="checkbox" label="RFCaliRate" />
                        <Form.Control type="text" disabled/>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="pk">
                        <Form.Label>频宽</Form.Label>
                        <Form.Select aria-label="pk">
                            <option>2.5kHz 400us</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="currentX">
                        <Form.Label>当前匀场X</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="currentY">
                        <Form.Label>当前匀场Y</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="currentZ">
                        <Form.Label>当前匀场Z</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="ignoreX">
                        <Form.Label>缺省匀场X</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="ignoreY">
                        <Form.Label>缺省匀场Y</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="ignoreZ">
                        <Form.Label>缺省匀场Z</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                </Form>
                <Stack style={{width: "70%"}} alignItems="center">
                    <ReactECharts
                        option={option}
                        style={{ height: 400,width: "100%" }}
                        opts={{ locale: 'FR' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button variant="outlined">找频率</Button>
                        <Button variant="outlined">匀场</Button>
                        <Button variant="outlined">停止</Button>
                        <Button variant="outlined">保存</Button>
                    </Box>
                </Stack>
            </Box>  
        </>
    )
}

export default AdjustCenterF
