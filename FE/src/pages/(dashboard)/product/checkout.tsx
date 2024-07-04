import React from 'react';
import { Switch } from '@/components/ui/switch';

const Checkout = () => {
    return (
        <div className="container mx-auto px-16">
            <header className="bg-gray-400 h-8"></header>
            <nav className="bg-yellow-400 h-8"></nav>
            <main className="mt-4">
                <div className="checkout flex justify-between">
                    <div className="noidung w-2/3 bg-white p-4">
                        <div className='title-ship flex justify-between items-center'>
                            <h4 className="text-xl text-black">Shipping</h4>
                            <span className='soluong text-gray-500 text-base'>(3)</span>
                        </div>
                        <hr className="mt-4" />
                        <form action="">
                            <div className="name flex justify-between mt-4">
                                <div className="first-name w-1/2 pr-2">
                                    <label className="text-sm" htmlFor="first-name">FIRST NAME *</label>
                                    <div>
                                        <input type="text" id="first-name" className="first mt-2 w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium" />
                                    </div>
                                </div>
                                <div className="last-name w-1/2 pl-2">
                                    <label className="text-sm" htmlFor="last-name">LAST NAME *</label>
                                    <div>
                                        <input type="text" id="last-name" className="last mt-2 w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm" htmlFor="country">Country / Region *</label>
                                <div className="mt-2">
                                    <select id="country" className="country w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium">
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="Hà Nam">Hà Nam</option>
                                        <option value="Thái Bình">Thái Bình</option>
                                        <option value="Hải Phòng">Hải Phòng</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm" htmlFor="address">Address *</label>
                                <div className="mt-2">
                                    <input type="text" id="address" placeholder="House number and street name" className="country w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium" />
                                    <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="country mt-2 w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium" />
                                </div>
                            </div>
                            <div className="Three flex justify-between mt-4">
                                <div className="city w-1/3 pr-2">
                                    <label className="text-sm" htmlFor="city">Town / City *</label>
                                    <div>
                                        <input type="text" id="city" className="input-3 mt-2 w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium" />
                                    </div>
                                </div>
                                <div className="province w-1/3 px-2">
                                    <label className="text-sm" htmlFor="province">Province *</label>
                                    <div className="mt-2">
                                        <select id="province" className="input-3 w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium">
                                            <option value="" />
                                            <option value="Hà Nam">Hà Nam</option>
                                            <option value="Thái Bình">Thái Bình</option>
                                            <option value="Hải Phòng">Hải Phòng</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="zip w-1/3 pl-2">
                                    <label className="text-sm" htmlFor="zip">Postcode / ZIP *</label>
                                    <div>
                                        <input type="text" id="zip" className="input-3 mt-2 w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium" />
                                    </div>
                                </div>
                            </div>
                            <div className="name flex justify-between mt-4">
                                <div className="phone w-1/2 pr-2">
                                    <label className="text-sm" htmlFor="phone">Phone (optional)</label>
                                    <div>
                                        <input type="text" id="phone" className="first mt-2 w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium" />
                                    </div>
                                </div>
                                <div className="email w-1/2 pl-2">
                                    <label className="text-sm" htmlFor="email">Email address *</label>
                                    <div>
                                        <input type="email" id="email" className="last mt-2 w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium" />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-5" />
                            <div className="mt-4">
                                <p className="title text-base font-medium text-black">What would you like us to do if an item is out of stock?</p>
                                <div className="mt-2">
                                    <select className="country w-full h-12 border-2 border-gray-200 rounded-lg px-2 font-medium">
                                        <option value="" />
                                        <option value="cancel">Cancel the order</option>
                                        <option value="wait">Wait for restock</option>
                                        <option value="contact">Contact me with updates</option>
                                    </select>
                                </div>
                            </div>
                            <hr className="mt-5" />
                            <div className="mt-4 flex items-center">
                                <input type="checkbox" id="ship-different" className="mr-2" />
                                <label htmlFor="ship-different" className="title-ship font-medium">Ship to a different address?</label>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm" htmlFor="order-notes">Order Notes (optional)</label>
                                <div className="mt-2">
                                    <textarea id="order-notes" cols={30} rows={4} className="note w-full h-24 border-2 border-gray-200 rounded-lg px-2 py-2 font-medium" placeholder="Notes about your order, e.g. special notes for delivery." defaultValue={''} />
                                </div>
                            </div>
                            <hr className="mt-5" />
                            <div className="mt-4">
                                <p className="title text-base font-medium text-black">Where did you hear about us?</p>
                                <div className="mt-2">
                                    <textarea cols={30} rows={4} className="note w-full h-24 border-2 border-gray-200 rounded-lg px-2 py-2 font-medium" placeholder="Let us know how you found us." defaultValue={''} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <aside className="w-1/3">
                        <div className="noidung-trai border border-gray-400 rounded-xl p-6 shadow-md">
                            <div className="bang-3 flex flex-col gap-4">
                                <div className="bang flex justify-between text-sm">
                                    <div className="title-bang text-gray-400">Subtotal</div>
                                    <div className="title-info text-black font-medium">$497.00</div>
                                </div>
                                <div className="bang flex justify-between text-sm">
                                    <div className="title-bang text-gray-400">Shipping</div>
                                    <div className="title-info text-black font-medium">New York, US</div>
                                </div>
                                <div className="bang flex justify-between text-sm">
                                    <div className="title-bang text-gray-400">Discount</div>
                                    <div className="title-info text-black font-medium">$0.0</div>
                                </div>
                            </div>
                            <hr className="mt-4" />
                            <div className="email-money flex justify-between items-center mt-4">
                                <p className="title-bang text-gray-400">Email Money Transfer</p>
                                <span>
                                    <img src="/src/assets/images/Icon1.png" className="click-email w-5 h-5" alt="Email Money Transfer" />
                                </span>
                            </div>
                            <div className="flex">
                                <input type="text" placeholder="Coupon code" className="code w-2/3 h-12 text-gray-400 px-2 border-2 border-gray-400 rounded-lg mr-2" />
                                <button className="btn-apply w-1/3 h-12 rounded-full border-2 border-green-100 bg-green-100 text-green-600 text-sm font-medium hover:bg-green-600 hover:text-green-100">Apply Coupon</button>
                            </div>

                            <div className="bang flex justify-between text-sm mt-4">
                                <div className="title-bang text-gray-400">Shipping Costs</div>
                                <div className="title-info tetx black font-medium">$50.00</div>
                            </div>

                            <hr className="mt-4" />

                            <div className="mt-4 flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-2 cursor-pointer" />
                                    <span className="text-gray-600 text-sm font-medium cursor-pointer">
                                        I confirm that my address is 100% correct and will not be liable if this shipment is sent to an incorrect address. *
                                    </span>
                                </label>
                            </div>

                            <div className="mt-3 flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-2 cursor-pointer" />
                                    <span className="text-gray-600 text-sm font-medium cursor-pointer">
                                        Sign me up to receive shopping updates and news via email (optional)
                                    </span>
                                </label>
                            </div>


                            <hr className="mt-4" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src="/src/assets/images/Icon.svg" alt="Coin" className="w-6 h-6" />
                                    <div className="text-gray-400 text-sm">Your point</div>
                                    <div className="text-gray-600 text-sm font-medium">10.850</div>
                                </div>
                                <Switch />
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="flex items-center justify-center w-full h-14 bg-gray-400 text-white text-base rounded-full hover:bg-black hover:text-gray-400 hover:border-2 hover:border-gray-400"
                                >
                                    <span className="mx-2">Place Order</span>
                                    <span className="mx-1">|</span>
                                    <span className="mx-2">$547.00</span>
                                </button>
                            </div>
                            <p className="payment text-gray-400 text-xs mt-4">SECURE PAYMENTS PROVIDED BY</p>
                            <img src="/src/assets/images/Row.svg" alt="Secure Payments" />
                        </div>
                    </aside>
                </div>
            </main>
            <footer className="bg-black h-12 mt-4"></footer>
        </div>
    );
}

export default Checkout;
