export interface Datakonsumen {
    id_konsumen     : string;
    no_konsumen     : string;
    tanggal_masuk   : string;
    tanggal_keluar  : string;
    nama_konsumen   : string;
    merek           : string;
    kelengkapan     : string;
    no_hp           : any;
    // biaya           : number;
    status          : number;
    jumlah_konsumen : string;
    problem_desk    : string;
    // jenis_perbaikan_hardware : string;
    // jenis_perbaikan_software : string;
    catatan         : string;

    description     :string;
    qty             :number;
    price           :number;
    itempricetotal  :number;
    totalprice      :number;
    modal           :number;
    totalcapital    :string;

    datenowD        :number;
    datenowM        :string;
    datenowY        :number;

    third_party_job  :boolean;
    third_party_name  :string;
    third_party_transfer_date : string;
    third_party_total_payment : string;


    deviceId  : string;


    id_pl         :string;
    hardwaretype  :string;
    brand         :string;
    type          :string;
    pricelist     :string;
    hd_capacity   :string;
    led_size       :string;
    keyboard_color :string;
    battery_oem_price  :string;
    battery_original_price :string;
    input_date    :string;

    
  }