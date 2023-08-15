import { useState } from 'react';



const DeviceDisplay = () => {

    return (
        <div className="main-device-display-container">
            <div className='secondary-device-display-container'>
                <div className="num-accounts-registered">
                    <h1 className="num-accounts-registered-title">Number of Accounts Registered</h1>
                    {/*Dynamic Data Display: # of accounts registered*/}
                </div>
                <div className="logged-device-location-container">
                    <h1 className="logged-device-location-title">Logged Device Location</h1>
                    {/*Dynamic Data Display: account location, date, etc. */}
                </div>
            </div>
        </div>
    )
}

export default DeviceDisplay;