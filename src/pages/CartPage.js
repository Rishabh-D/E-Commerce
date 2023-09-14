import Cart from "../features/cart/Cart";

function CartPage() {
    return (
        <>
            <Cart
                pageName="CartPage"
                btnText="Checkout"
                link="/checkout"
            ></Cart>
        </>
    );
}

export default CartPage;
