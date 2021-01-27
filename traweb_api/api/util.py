class Url:
    def __init__(self, url):
        self.url = url

    def get_id_of(self, segment):
        """
        Returns id from REST API style endpoint positioned after 'segment' parameter, which should contain trailing slash.
        """
        begin_index = self.url.find(segment) + len(segment)
        end_index = max(self.url.find('/', begin_index), len(segment)-1)
        return self.url[begin_index:end_index]