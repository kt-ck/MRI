import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import "../localSCSS/MRIControls.scss";
import "echarts/i18n/langFR";
import AdjustCenterF from './AdjustCenterF';
import FindXpr from "./FindXpr";
import StartToScan from "./StartToScan";
import MRIFinalPanel from './MRIFinalPanel';
const MRIControl = ({token}) => {
    const steps = ['调整中心频率', '选择序列文件', '开始扫描'];
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [pp, setPp] = useState(-0.431);
    const [spfd, setSpfd] = useState(20);
    const [scanParam, setScanParam] = useState({})
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const formSubmit = () => {

    }
    return (
        <div className="container">
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>重新设置</Button>
                    </Box>
                    < MRIFinalPanel token={token} />
                    </>
                ) : (
                    <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        >
                        Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                            Skip
                        </Button>
                        )}

                        <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Start to Scan' : 'Next'}
                        </Button>
                    </Box>
                    
                    {activeStep === 0 &&(
                        <AdjustCenterF pp={pp} setPp={setPp} spfd={spfd} setSpfd={setSpfd}/>
                    )}
                    {
                        activeStep === 1 && (
                            <FindXpr token={token} scanParam={scanParam} setScanParam={setScanParam} />
                        )
                    }
                    {
                        activeStep === 2 && (
                            <StartToScan token={token} scanParam={scanParam} setScanParam={setScanParam}/>
                        )
                    }
                    
                    </>
                )}
                </Box>
        </div>
    )
}

export default MRIControl
