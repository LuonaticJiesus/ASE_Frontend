const download = {
  mounted: (el, binding) => {
    el.addEventListener('click', () => {
      console.log(binding.value);
      const link = document.createElement('a');
      const url = binding.value.url;
      const name = binding.value.name;
      // 这里是将url转成blob地址，
      console.log(url);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          link.href = URL.createObjectURL(blob);
          console.log(link.href);
          link.download = name;
          document.body.appendChild(link);
          link.click();
        });
    });
  },
};
export default download;
