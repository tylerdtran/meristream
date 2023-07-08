

export default function DeviceLimitation() {
    return (
        <div>
            <h1>Sign In</h1>
            <div>you have reached the device limit for your account.</div>
            <div>to continue, please select a device below to sign out of:</div>
                <div> Device Type | Device Location | date</div>
            <div>or please upgrade your account to add more devices.</div>
            <div>Device 1</div>
                <form className="device-quantity-management" >
                    Total Device wanted: (All devices will be Signed Out automatically once incremented)
                    <input type="submit" value="Sign Out" />
                </form>
                    

            

        </div>
    )
}
