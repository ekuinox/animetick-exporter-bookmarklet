# animetick-exporter-bookmarklet

animetickの視聴状況をJSONとして保存するためのブックマークレット

## usage

`http://animetick.net/users/{username}[?page=\d+]`を開いて実行する。

```json
[
    {
        "name": "ご注文はうさぎですか？BLOOM", // アニメのタイトル
        "episodes": [
            [
                "#12 その一歩は君を見ているから踏み出せる", // サブタイトル
                true // 視聴状況 boolean or null
            ],
            ...
        ]
    },
    ...
]
```

こんな感じのJSONが保存されます。

各アニメのエピソードの視聴履歴を取得するために`http://animetick.net/anime/{anime_id}`へ`fetch`することに注意してください。

## build

1. `$ git clone https://github.com/ekuinox/animetick-exporter-bookmarklet`
2. `$ npm i`
3. `$ npm run build`
