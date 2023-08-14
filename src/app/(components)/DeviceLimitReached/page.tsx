import './DeviceLimitation.scss'


const DeviceLimitation = () => {
    return (
        <div className="h-screen device-limit">
            <div className="device-limit-container">
                <div className='device-limit-header'>
                    <h1 className='device-limit-title'>Sign In</h1>
                </div>
                <div className="device-limit-description">
                    <div>You have reached the device limit for your account to continue, please select a device  <br /> below to sign out of:</div>
                </div>
                <div className="device-limit-description">
                        Device Type | Device Location | date
                </div>
                <div  className="device-limit-description">or please upgrade your account to add more devices.</div>
                <div  className="device-limit-description">Device 1</div>
                    <form className="device-quantity-management device-limit-description" >
                        Total Device wanted: (All devices will be Signed Out automatically once incremented)
                    </form>
                <div className="device-limit-continue"> 
                    <button className="continue-button">Continue</button>
                </div>
            </div>
        </div>
    )
}
export default DeviceLimitation;
