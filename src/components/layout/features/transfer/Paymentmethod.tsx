import type { TransferData } from "../../../../types";

export function Paymentmethod({ onNext, onBack, data }: { onNext: (data: Partial<TransferData>) => void, onBack: () => void, data: Partial<TransferData> }) {
    return (
        <div>
            <h1>Payment Method</h1>
        </div>
    )
}