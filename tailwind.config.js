/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  [ "./src/**/*.{html,ts}",
              "./node_modules/tw-elements/js/**/*.js"
            ],
  theme: {
    container:{
      center:true,
      padding:"1rem",
      screens:{
        sm:"600px",
        md:"728px",
        lg:"984px",
        xl:"1140px",
        "2xl":"1320px"
      }
    },
    extend: {
      colors:{
        'j1':'#8E2DE2',
        'j2':'#4A00E0',
        'c1':'#F2994A',
        'c2':'#F2C94C',
        'c3':'#b1c9ef',
        'c4':'#8aaee0',
        'c5':'#628ecb',
        'c6':'#395886',
        'c7':'#0d1821',
        'g1':'#ff9966',
        'g2':'#ACB6E5',
        'g3':'#4568DC',
        'g4':'#B06AB3',
        'd1':'#C9D6FF',
        'd2':'#E2E2E2',
        'b1':'rgb(250,87,103)',
        'b2':'rgb(121, 68, 228)',
        'b3':'rgb(27, 145, 247)',
        'b4':'rgb(250, 194, 76)',

      },
      backgroundImage:{
        'bg1':"url('./assets/bg1.png')",
        'bg2':"url('./assets/bg2.png')",
        'bg3':"url('./assets/bg3.png')",
        'bg4':"url('./assets/bg4.png')",
        'bg5':"url('./assets/bg5.png')",
        'bg6':"url('./assets/bg6.png')",
        'bgBlack': "url('./assets/bgBlack.png')",
        'bga': "url('./assets/bga.png')",
        'bgDes': "url('./assets/Designer.png')",
        'bgDoo': "url('./assets/doodad.png')",
        'bgDoo2': "url('./assets/doodad2.png')",
        'bgvid': "url('./assets/videobg.mp4')",
        'bgflow1': "url('./assets/bgflow1.png')",
        'bgflow2': "url('./assets/bgflow2.png')",
        'bgflow3': "url('./assets/bgflow3.png')",
        'bgleaf': "url('./assets/bgleaf.jpg')",
      },
      fontFamily:{
        display:["Montserrat","cursive"],
        rajdhani:["Rajdhani","cursive"]
      }
    },
  },
  plugins: [],
}

