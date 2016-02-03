<h2>Оплатите ваш заказ</h2>
<p>Выберите ваш банк, перейдя по ссылке ниже</p>
<style>
    .payment-links i { font-size:20px; display:inline-block; margin-right:6px; color: #fff; text-shadow:1px 1px 0 rgba(0,0,0,0.6);
    }
    .payment-links span { font-size:14px; display:inline-block; margin-left:5px; color: #fff; text-shadow:1px 1px 0 rgba(0,0,0,0.6); }
</style>
<div class="well well-sm">
    <div class="payment-links">
        <a target="_blank" href="https://secure.onpay.ru/pay/oxanavy?pay_mode=free&f=12&select=VTB&currency=RUR&price_final=true#/step1" class="btn btn-primary card">
        <i class="icon-cc-mastercard"></i>
        <i class="icon-cc-visa"></i>
        <span>Оплатить банковской картой</span>
        </a>

    </div>
</div>

<div class="buttons">
  <div class="pull-right">
    <input type="button" value="<?php echo $button_confirm; ?>" id="button-confirm" class="btn btn-primary" data-loading-text="<?php echo $text_loading; ?>" />
  </div>
</div>


<script type="text/javascript"><!--
$('#button-confirm').on('click', function() {
    $.ajax({
        type: 'get',
        url: 'index.php?route=payment/bank_transfer/confirm',
        cache: false,
        beforeSend: function() {
            $('#button-confirm').button('loading');
        },
        complete: function() {
            $('#button-confirm').button('reset');
        },
        success: function() {
            location = '<?php echo $continue; ?>';
        }
    });
});
//--></script>
