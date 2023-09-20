import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
    return (
        <>
            <Navbar>
                <UserOrders />
            </Navbar>
        </>
    );
}

export default UserOrdersPage;
