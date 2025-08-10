import React, { useState } from 'react';

const servicesList = [
    { id: 1, name: 'ตัดผม', icon: '✂️', basePrice: 300 },
    { id: 2, name: 'ทำสีผม', icon: '🎨', basePrice: 1500 },
    { id: 3, name: 'ทำเล็บ', icon: '💅', basePrice: 800 },
    { id: 4, name: 'นวดหน้า', icon: '💆‍♀️', basePrice: 1200 },
    { id: 5, name: 'สระผม', icon: '🧴', basePrice: 250 },
];

const styles = {
    pageContainer: {
        fontFamily: "'Prompt', sans-serif",
        backgroundColor: '#F8FAF7',
        minHeight: '100vh',
        padding: '2rem',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
    },
    mainContainer: {
        maxWidth: 960,
        width: '100%',
        display: 'flex',
        gap: 24,
        position: 'relative',
    },
    serviceSelectContainer: {
        flex: 1,
    },
    header: {
        fontWeight: 700,
        fontSize: '2rem',
        marginBottom: '2rem',
        color: '#3C6255',
        userSelect: 'none',
    },
    servicesWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
    },
    serviceCard: {
        flex: '1 1 45%',
        cursor: 'pointer',
        padding: '16px 10px',
        borderRadius: 14,
        textAlign: 'center',
        userSelect: 'none',
        border: '1.5px solid #A9CBB7',
        color: '#3C6255',
        fontWeight: 500,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        fontSize: '1.1rem',
        minHeight: 110,
        transition: 'all 0.25s ease-in-out',
    },
    serviceCardSelected: {
        borderColor: '#6B8E23',
        backgroundColor: '#D8E8C8',
        fontWeight: 700,
        boxShadow: '0 4px 12px rgba(107, 142, 35, 0.25)',
        color: '#4A6B19',
    },
    icon: {
        fontSize: 36,
    },
    sidebar: {
        flexBasis: 350,
        backgroundColor: 'white',
        borderRadius: 14,
        boxShadow: '0 0 12px rgba(0,0,0,0.1)',
        padding: '1.5rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh',
        overflowY: 'auto',
    },
    sidebarHeader: {
        fontWeight: 700,
        fontSize: '1.5rem',
        marginBottom: '1.2rem',
        color: '#3C6255',
    },
    selectedList: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '1rem',
    },
    selectedItem: {
        borderBottom: '1px solid #eee',
        paddingBottom: 12,
        marginBottom: 12,
    },
    serviceNamePriceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 600,
        fontSize: '1.1rem',
        marginBottom: 6,
        color: '#4A6B19',
    },
    inputLabel: {
        fontSize: '0.9rem',
        color: '#555',
        marginBottom: 4,
        fontWeight: 500,
    },
    priceInput: {
        width: '100%',
        padding: '6px 10px',
        borderRadius: 8,
        border: '1px solid #A9CBB7',
        fontSize: '1rem',
        marginBottom: 12,
        boxSizing: 'border-box',
    },
    noteInput: {
        width: '100%',
        minHeight: 60,
        padding: 8,
        borderRadius: 8,
        border: '1px solid #A9CBB7',
        fontSize: '1rem',
        resize: 'vertical',
        boxSizing: 'border-box',
    },
    sidebarFooter: {
        borderTop: '1px solid #DDD',
        paddingTop: '1rem',
    },
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: '#F4F9F4',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    inputField: {
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid #CDE4C9',
        fontSize: '1rem',
        background: '#FFFFFF',
        transition: 'all 0.3s ease',
        outline: 'none',
    },
    buttonPrimary: {
        background: '#6B8E23',
        color: 'white',
        padding: '12px',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    buttonPrimaryHover: {
        background: '#56771D',
    },
    formInput: {
        width: '100%',
        padding: '14px 16px',
        borderRadius: 12,
        border: '1.5px solid #A9CBB7',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        color: '#2F4F4F',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        marginBottom: '1.4rem',
    },
    formHeader: {
        fontWeight: 700,
        fontSize: '1.6rem',
        textAlign: 'center',
        marginBottom: '1.6rem',
        color: '#3C6255',
    },
    priceWarningText: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '-10px',
        marginBottom: '12px',
        fontWeight: 500,
    },


};

const dateInputStyle = {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    padding: '12px 16px',
    border: '1px solid #CDE4C9',
    borderRadius: '10px',
    fontSize: '1rem',
    backgroundColor: '#FFFFFF',
    color: '#333',
    cursor: 'pointer'
};


function Booking() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [buttonHover, setButtonHover] = useState(false);
    const bookingNumber = '01';


    // ข้อมูลปรับราคาหรือหมายเหตุในใบจอง 
    const [adjustments, setAdjustments] = useState({});

    const toggleService = (id) => {
        if (selectedServices.includes(id)) {
            // ลบบริการ พร้อมลบข้อมูลปรับราคาของบริการนั้นด้วย
            setSelectedServices(selectedServices.filter((sid) => sid !== id));
            setAdjustments((prev) => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });
        } else {
            setSelectedServices([...selectedServices, id]);
        }
    };

    const handleAdjustmentChange = (id, field, value) => {
        setAdjustments((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleNextClick = () => {
        if (selectedServices.length === 0) {
            alert('กรุณาเลือกบริการอย่างน้อย 1 อย่าง');
            return;
        }
        setShowForm(true);
    };

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let totalPrice = 0;
        const serviceSummary = selectedServices.map((id) => {
            const service = servicesList.find((s) => s.id === id);
            const base = service.basePrice;
            const adjustmentPrice =
                adjustments[id] && adjustments[id].price ? parseFloat(adjustments[id].price) : 0;
            totalPrice += base + adjustmentPrice;
            const note = adjustments[id] && adjustments[id].note ? adjustments[id].note : '-';
            return {
                name: service.name,
                price: base + adjustmentPrice,
                note,
            };
        });

        const bookingData = {
            customerName: formData.name,
            customerPhone: formData.phone,
            bookingDate: formData.date,
            bookingTime: formData.time,
            services: serviceSummary,
            totalPrice,
            status: 'pending',
        };

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                alert('จองคิวสำเร็จ!');
                setSelectedServices([]);
                setAdjustments({});
                setFormData({ name: '', phone: '', date: '', time: '' });
                setShowForm(false);
            } else {
                alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่');
            }
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่');
        }
    };


    return (
        <div style={styles.pageContainer}>
            <div style={styles.mainContainer}>
                {/* เลือกบริการ */}
                <div style={styles.serviceSelectContainer}>
                    {!showForm ? (
                        <>
                            <h2 style={styles.header}>เลือกบริการที่ต้องการ</h2>
                            <div style={styles.servicesWrapper}>
                                {servicesList.map((service) => {
                                    const selected = selectedServices.includes(service.id);
                                    return (
                                        <div
                                            key={service.id}
                                            onClick={() => toggleService(service.id)}
                                            style={{
                                                ...styles.serviceCard,
                                                ...(selected ? styles.serviceCardSelected : {}),
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') toggleService(service.id);
                                            }}
                                        >
                                            <div style={styles.icon}>{service.icon}</div>
                                            {service.name}
                                            <div style={{ fontWeight: '400', fontSize: 14, marginTop: 6 }}>
                                                ราคา {service.basePrice} บาท
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button
                                style={{
                                    ...styles.buttonPrimary,
                                    marginTop: 24,
                                    ...(buttonHover ? styles.buttonPrimaryHover : {}),
                                }}
                                onClick={handleNextClick}
                                onMouseEnter={() => setButtonHover(true)}
                                onMouseLeave={() => setButtonHover(false)}
                            >
                                ถัดไป
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 style={styles.formHeader}>กรอกข้อมูลสำหรับจองคิว</h2>
                            <form onSubmit={handleSubmit} style={styles.formWrapper}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="ชื่อ"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                    style={styles.inputField}
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="เบอร์โทร"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    pattern="[0-9]{9,10}"
                                    title="กรุณากรอกเบอร์โทร 9-10 ตัวเลข"
                                    autoComplete="off"
                                    style={styles.inputField}
                                />

                                <input
                                    type="date"
                                    name="date"
                                    lang="th"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    style={dateInputStyle}
                                />

                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    style={styles.inputField}
                                >
                                    <option value="" disabled>
                                        เลือกเวลา
                                    </option>
                                    {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="submit"
                                    style={{
                                        ...styles.buttonPrimary,
                                        ...(buttonHover ? styles.buttonPrimaryHover : {}),
                                    }}
                                    onMouseEnter={() => setButtonHover(true)}
                                    onMouseLeave={() => setButtonHover(false)}
                                >
                                    ✅ ยืนยันจองคิว
                                </button>
                            </form>

                        </>
                    )}
                </div>

                {/* แถบใบจอง */}
                {selectedServices.length > 0 && !showForm && (
                    <aside style={styles.sidebar} aria-live="polite">
                        <h3 style={styles.sidebarHeader}>คิว {bookingNumber}</h3>
                        <div style={styles.selectedList}>
                            {selectedServices.map((id) => {
                                const service = servicesList.find((s) => s.id === id);
                                const adj = adjustments[id] || {};
                                return (
                                    <div key={id} style={styles.selectedItem}>
                                        <div style={styles.serviceNamePriceRow}>
                                            <span>
                                                {service.icon} {service.name}
                                            </span>
                                            <span>{service.basePrice} บาท</span>
                                        </div>
                                        <label style={styles.inputLabel}>
                                            หมายเหตุ
                                            <textarea
                                                placeholder="เช่น ผมหนา ผมเยอะ ทำยาก ฯลฯ"
                                                value={adj.note || ''}
                                                onChange={(e) =>
                                                    handleAdjustmentChange(id, 'note', e.target.value)
                                                }
                                                style={styles.noteInput}
                                            />
                                        </label>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ราคาสุทธิรวม */}
                        <div style={{ fontWeight: '700', fontSize: '1.2rem', marginTop: 16, color: '#4A6B19' }}>
                            รวมทั้งหมด: {selectedServices.reduce((sum, id) => {
                                const service = servicesList.find(s => s.id === id);
                                return sum + (service ? service.basePrice : 0);
                            }, 0)} บาท
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
}

export default Booking;
