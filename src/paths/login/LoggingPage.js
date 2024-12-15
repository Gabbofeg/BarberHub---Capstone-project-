import Logging from "../../components/Login/Logging";
import CustomForm from "../../components/Form/customForm";

export const LoggingPage = () => {
    return(
        <div className="logging-page">
            <Logging />
            <div className="d-flex justify-content-center w-100">
                <CustomForm /> 
            </div>
        </div>
    )
};