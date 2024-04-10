import qrcode from "./qrcode.jpeg";
const Pay = () => {
    return (
        <div className="container">
            <center>
            <div >
                <h1>Make Payment</h1>
                <br />
                <p>pleace scane to pay</p>
                <br />
                <img src={qrcode} height="300px" width="300px" alt="qrcode"/>
            </div>
            </center>
           
        </div>
    );
}
export default Pay;