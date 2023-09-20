import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
    return (
        <>
            <Navbar>
                <UserProfile />
            </Navbar>
        </>
    );
}

export default UserProfilePage;
