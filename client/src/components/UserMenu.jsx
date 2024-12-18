import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import { clearUser } from "../store/userSlice";
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import toast from 'react-hot-toast';
import AxiosToastError from "../utils/AxiosToastError";

const UserMenu = ({close}) => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = async() => {
        try{

            const response = await Axios({
                ...SummaryApi.logout
            });

            if(response.data.success) {
                dispatch(clearUser());
                localStorage.clear();
                toast.success(response.data.message);
                close();
            }

        }
        catch(err){
            console.error(err);
            AxiosToastError(err);
        }
    };

    return (
        <div className="w-full text-xl lg:text-sm relative">
            <div className="font-semibold">My Account</div>
            <div className="mb-4 py-2 lg:mb-0 lg:py-0">{user.name || user.mobile}</div>

            <Divider />

            <div className="grid gap-2 lg:gap-1 pt-4 lg:pt-0">
                <Link to={"/"} className="rounded px-4 lg:px-2 bg-slate-200 lg:bg-transparent py-1 hover:bg-slate-200">My Orders</Link>
                <Link to={"/"} className="rounded px-4 lg:px-2 bg-slate-200 lg:bg-transparent py-1 hover:bg-slate-200">Save Address</Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-200 lg:bg-red-100 rounded p-1 mt-2 hover:bg-red-200 absolute bottom-5 w-full lg:relative lg:bottom-0"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default UserMenu;