import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment-service/payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  ngOnInit(): void {
    
  }

  constructor(private paymentService: PaymentService) {}

  payNow() {
    this.paymentService.createOrder(500, 'INR').subscribe(
      (order: any) => {
        const options = {
          key: 'rzp_test_u2zpkcOfjVym1W', // Your Razorpay Key ID
          amount: order.amount,
          currency: 'INR',
          name: 'Your Company Name',
          description: 'Test Transaction',
          order_id: order.id,
          handler: function (response: any) {
            console.log('Payment ID:', response.razorpay_payment_id);
            console.log('Order ID:', response.razorpay_order_id);
            console.log('Signature:', response.razorpay_signature);
            alert('Payment successful!');
          },
          prefill: {
            name: 'Your Name',
            email: 'your_email@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      },
      (error) => {
        console.error('Payment error:', error);
      }
    );
  }
}
