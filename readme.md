# Template Tester
Aplikácia slúži testovanie šablón pomocou PhantomJS. Funguje na pricípe nahrávania šablóny a odosielanie tovarov cez **POST** request vo formáte **JSON**. 

### Príklad dát
**1 tovar:**
```
 {
    "_id": "611123e16fdf3a86ec44696f",
    "sku": "14626",
    "store": "6",
    "sale_unit": "",
    "name": "AVIRIL DETSKÝ ZÁSYP 100 g SÁČOK",
    "unit_price": 11.9,
    "unit": "kg",
    "place_of_origin": "",
    "name_of_origin": "",
    "price": 1.19,
    "price_old": 1.19,
    "discount_value": "",
    "description": "",
    "brand": "ALPA",
    "spec": "",
    "typ_template": "",
    "date_begin": "",
    "date_end": "",
    "icon": "",
    "category": "11",
    "grade": "Trieda II.",
    "sku_pack": "",
    "rp_price": "",
    "price30": 8.99,
    "ean": ["8594001771479"],
    "createdAt": "2024-07-03T08:49:11.884Z",
    "updatedAt": "2024-07-11T12:21:00.607Z"
  },
```

**2 a viac tovarov:**

```json
[ {
    "_id": "611123e16fdf3a86ec44696f",
    "sku": "14626",
    "store": "6",
    "sale_unit": "",
    "name": "AVIRIL DETSKÝ ZÁSYP 100 g SÁČOK",
    "unit_price": 11.9,
    "unit": "kg",
    "place_of_origin": "",
    "name_of_origin": "",
    "price": 1.19,
    "price_old": 1.19,
    "discount_value": "",
    "description": "",
    "brand": "ALPA",
    "spec": "",
    "typ_template": "",
    "date_begin": "",
    "date_end": "",
    "icon": "",
    "category": "11",
    "grade": "Trieda II.",
    "sku_pack": "",
    "rp_price": "",
    "price30": 8.99,
    "ean": ["8594001771479"],
    "createdAt": "2024-07-03T08:49:11.884Z",
    "updatedAt": "2024-07-11T12:21:00.607Z"
  }, {
    "_id": "611117076fdf3a86ec43dc48",
    "sku": "14626",
    "store": "2",
    "sale_unit": "",
    "name": "AVIRIL DETSKÝ ZÁSYP 100 g SÁČOK",
    "unit_price": 11.9,
    "unit": "kg",
    "place_of_origin": "",
    "name_of_origin": "",
    "price": 1.19,
    "price_old": 1.19,
    "discount_value": "",
    "description": "",
    "brand": "ALPA",
    "spec": "",
    "typ_template": "",
    "date_begin": "",
    "date_end": "",
    "icon": "",
    "category": "11",
    "grade": "Trieda II.",
    "sku_pack": "",
    "rp_price": "",
    "price30": 8.99,
    "ean": ["8594001771479"],
    "createdAt": "2024-07-03T08:44:51.766Z",
    "updatedAt": "2024-07-11T12:21:00.297Z"
  }]
```

## Nahrávanie šablóny
Nahrané šablóny sa ukladajú do /uploads priečinku v aplikácií, samozrejme je možnosť konfigurácie.
Pri nahrávaní šablóny je potrebné vybrať rozmer šablóny, a tá sa následne na server uloží pod daným názvom/typom šablóny. Nahrávame **ZIP** priečinok, ktorý sa následne rozbalí, vymaže sa, a extrahovaný priečinok **bude mať názov podla vybraného typu cenovky!**


```js
  app.post('/upload-template', upload.single('template'), async (req, res) => {
    try {
      const tempType = req.body.tempType.replace(/\s*\(.*?\)$/, '')
      const templateFile = req.file
      console.log(tempType)

      if (!templateFile) {
        throw new Error('No template file uploaded')
      }

      const extractedPath = path.join('uploads', tempType)

      // Extrahovanie súboru
      await fs
        .createReadStream(templateFile.path)
        .pipe(unzip.Extract({ path: extractedPath }))
        .promise()
      console.log('File extracted successfully to:', extractedPath)

      // Odstránenie pôvodného zip súboru
      fs.unlink(templateFile.path, (err) => {
        if (err) {
          console.error('Error deleting original zip file:', err)
        } else {
          console.log('Original zip file deleted successfully.')
        }
      })

      res.send('File uploaded and extracted successfully.')
    } catch (error) {
      console.error('Error processing form data:', error)
      res.status(500).send('Error processing form data')
    }
  })
```


## Renderovanie cenovky

**POST** request na adresu `/render-image`

```js
  app.post('/render-image', async (req, res) => {
    try {
      const opts = {
        mime: { png: 'image/png' },
        template: req.body.template,
        repeats: req.body.repeats,
        article: req.body.article,
        width: req.body.size.width,
        height: req.body.size.height
      }
      const imageBuffer = await PhantomRenderer.renderImage(opts)
      console.log(imageBuffer)
      if (!Buffer.isBuffer(imageBuffer)) {
        throw new Error('imageBuffer is not a buffer object')
      }
      res.set(headers)
      res.send(imageBuffer)
    } catch (error) {
      console.error(error)
      res.status(400).send('Nejdze to.')
    }
  })
}
```

Funkcia `renderImage` sa nachádza v `renderPhantom.js`. Prijíma všetky dáta z **POST** requestu, otvorí template, naplní ho dátami a vráti v odpovedi obrázok.
```js
  async renderImage(opts) {
    try {
      const template = opts.template
      opts['_phantomKey'] = template + '_' + opts.width + 'x' + opts.height
      const phantomKey = opts._phantomKey

      const page = await this.getTemplate(template, opts)

      const data = opts.article

      await page.evaluate(function (args) {
        setPageData(args)
      }, data)

      const image = await this.renderBase64(page, phantomKey)
      return Buffer.from(image, 'base64')
    } catch (error) {
      console.error('Error rendering image:', error)
      throw error
    }
  }
```

## Inštalácia
Inštalácia je podobná ako pri Rendereri, ale na linuxe treba spojazdniť PhantomJS.

Skript na spustenie TT ako služby (linux):
```
[Service]
User=wifono
WorkingDirectory=/home/wifono
Environment="OPENSSL_CONF=/dev/null"
Environment="NVM_DIR=/home/wifono/.nvm"
ExecStart=/bin/sh -c '. /home/wifono/.nvm/nvm.sh && nvm use 20.10.0 && /usr/bin/yarn run dev'
StandardOutput=syslog
StandardError=syslog
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

