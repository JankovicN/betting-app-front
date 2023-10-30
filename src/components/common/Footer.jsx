import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <div className={`row mt-3 ${classes.footer}`}>
                <div className="col-3  p-0">
                    <div className=" ">
                    </div>
                </div>
                <div className="col-6">
                    <div className=" pt-5 ">
                        <div className="title pb-3">
                            <h1 className="w-100  text_center m-auto">TRIUMPH BET</h1>
                        </div>

                        <div className="text_center m-auto pb-2">
                            <a className="fs-5 link" href="/">Home</a>
                        </div>
                        <div className="text_center m-auto pb-5">
                            <a className="text_center m-auto fs-5 link" href="/user">Profile</a>
                        </div>
                        <p className="w-100 text_center m-auto">All Rights Reserved 2023</p>
                    </div>
                </div>
                <div className="col-3  p-0">
                    <div className=" ">
                    </div>
                </div>
            </div >
        </>
    );
};

export default Footer;