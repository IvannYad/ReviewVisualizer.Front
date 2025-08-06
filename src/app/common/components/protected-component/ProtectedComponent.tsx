import { useContext, useEffect, useState } from "react";
import FRONTEND_ROUTES from "../../constants/frontend-routes.constants";
import { useNavigate } from "react-router";
import { ApisContext, NotificationApiContext } from "../../../layout/app/App";

type ProtectedComponentProps = {
    children: React.ReactNode;
    pageName: string;
    pageRoute: string;
}

export default function ProtectedComponent(props: ProtectedComponentProps){
    const [hasAccess, setHasAccess] = useState(false);
    const navigate = useNavigate();
    const { authApi } = useContext(ApisContext);
    const notificationAPi = useContext(NotificationApiContext)

    const handleAccessCheckAsync = async (checkAccessMethod: () => Promise<void>, pageRoute: string, pageName: string) => {
        console.log(checkAccessMethod)
        await checkAccessMethod()
            .catch(e => {
                if (e.status === 401){
                    navigate("/login");
                    return;
                } else if (e.status === 403){
                    console.log("notification api: " + notificationAPi)
                    notificationAPi && notificationAPi["error"]({
                        message: `You have no access to ${pageName} page`,
                        className: "error-notification-box"
                    });
                    navigate(-1)
                    return;
                }

                notificationAPi && notificationAPi["error"]({
                        message: `Unexpected error ocurred while verifying access to the ${pageName} page`,
                        className: "error-notification-box"
                    });
            });
    }

    const getApiAccessMethod = () => {
        if (props.pageRoute === FRONTEND_ROUTES.PAGES.GENERATOR) return () => authApi.tryGeneratorAccess();
        if (props.pageRoute === FRONTEND_ROUTES.PAGES.PROCESSOR) return () => authApi.tryGeneratorAccess();
        if (props.pageRoute === FRONTEND_ROUTES.PAGES.OWNER) return () => authApi.tryOwnerAccess();

        return () => authApi.tryVisitorAccess();
    }

    useEffect(() => {
        console.log("asd");
        handleAccessCheckAsync(getApiAccessMethod(), props.pageRoute, props.pageName)
            .then(() => {
                console.log("Have access");
                setHasAccess(true)
            })
            .catch(() => {
                console.log("Does not have access");
                setHasAccess(false);
            })
    }, [props]);

    return (
        <div>
            {
                hasAccess ? (
                    <>
                        {props.children}
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )   
}