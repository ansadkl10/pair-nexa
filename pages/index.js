import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { QrCode, Smartphone, Loader2, ShieldCheck } from 'lucide-react';

let socket;

export default function Home() {
    const [method, setMethod] = useState('qr');
    const [phone, setPhone] = useState('');
    const [qr, setQr] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        socket = io();
        socket.on('qr', (data) => { setQr(data); setLoading(false); });
        socket.on('code', (data) => { setCode(data); setLoading(false); });
        socket.on('connected', () => { alert("Connected!"); setLoading(false); });
        return () => socket.disconnect();
    }, []);

    const start = () => {
        setLoading(true); setQr(''); setCode('');
        socket.emit('start-session', { type: method, phone });
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md text-center">
                <h1 className="text-5xl font-black mb-2 tracking-tighter italic text-white">NEXA-MD</h1>
                <p className="text-gray-500 mb-10 text-xs uppercase tracking-widest">Premium Session Generator</p>
                
                <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                    <div className="flex bg-black p-1.5 rounded-2xl mb-8 border border-white/5">
                        <button onClick={() => setMethod('qr')} className={`flex-1 py-4 rounded-xl transition ${method === 'qr' ? 'bg-white text-black font-bold' : 'text-gray-500'}`}>QR</button>
                        <button onClick={() => setMethod('pair')} className={`flex-1 py-4 rounded-xl transition ${method === 'pair' ? 'bg-white text-black font-bold' : 'text-gray-500'}`}>PAIR</button>
                    </div>

                    {method === 'pair' && !code && (
                        <input className="w-full bg-black border border-white/10 p-5 rounded-2xl mb-5 text-center text-white text-2xl outline-none focus:border-white/40" placeholder="9190xxxxxx" onChange={(e) => setPhone(e.target.value)} />
                    )}

                    {!qr && !code ? (
                        <button onClick={start} className="w-full bg-white text-black font-black py-5 rounded-2xl hover:scale-95 transition-all">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : "GENERATE"}
                        </button>
                    ) : (
                        <div className="flex flex-col items-center">
                            {qr && <img src={qr} className="w-64 h-64 rounded-2xl border-4 border-white/5 p-2 bg-white" />}
                            {code && <h2 className="text-6xl font-mono font-bold text-green-500 tracking-[8px] my-6">{code}</h2>}
                        </div>
                    )}
                </div>
                <div className="mt-8 flex items-center justify-center text-gray-600 text-[10px] uppercase tracking-widest">
                    <ShieldCheck size={14} className="mr-2"/> Secure & Encrypted
                </div>
            </div>
        </div>
    );
}
