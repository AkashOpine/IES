function BarCodeHeader(props: any) {
  return (
    <div className="header-items">
      <div>
        <input
          type="number"
          className="input-number"
          placeholder="From"
          value={props.from}
          onChange={(e) => props.setFrom(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          className="input-number"
          placeholder="To"
          value={props.to}
          onChange={(e) => props.setTo(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          className="input-number"
          placeholder="No. of copies"
          value={props.copies}
          onChange={(e) => props.setCopies(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-view btn-barcode">
        Generate Barcodes
      </button>
      {/* {barcodes.map((value: any, index: any) =>
          Array.from({ length: copies }, (_, i) => (
            <Barcode key={index * copies + i} value={value} />
          ))
        )} */}
    </div>
  );
}

export default BarCodeHeader;
