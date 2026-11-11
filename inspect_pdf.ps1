$pdfPath = "d:\Ayapbergenov Qadirbergen\odam-anatomiyasi_-atlas_-1-jild-n_ahmedov-2.pdf"
$fileStream = [System.IO.File]::OpenRead($pdfPath)
$reader = New-Object System.IO.StreamReader($fileStream, [System.Text.Encoding]::ASCII)
$content = $reader.ReadToEnd()
$reader.Close()
$fileStream.Close()

Write-Host "Total length: $($content.Length)"
$pageMatches = [System.Text.RegularExpressions.Regex]::Matches($content, "/Type\s*/Page\b")
Write-Host "Page objects found: $($pageMatches.Count)"
$imageMatches = [System.Text.RegularExpressions.Regex]::Matches($content, "/Subtype\s*/Image\b")
Write-Host "Image objects found: $($imageMatches.Count)"
