import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Paths} from "../../utils/paths.ts";


const Error404Page = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    useEffect(() => {
        if(pathname !== "/errorPage")
            navigate('/errorPage');
        else navigate(Paths.HOME);
    }, []);
    return (
        <div>
            <img style={{
                height:"80vh",
            }}
                 src="src/images/error404.jpg" alt="Page not found"/>
            <h2>Page not found</h2>
        </div>
    );
};

export default Error404Page;